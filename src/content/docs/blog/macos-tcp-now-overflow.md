---
title: "macOS 開機 49.7 天就連不上網？tcp_now 溢位筆記"
date: 2026-11-05
authors: mikimoto
tags: ["Apple", "macOS", "Network"]
---

聽說 Mac 開太久沒重開機，網路會突然連不上，ping 卻還是通的。查了一下真的有這個 bug，原因是 XNU kernel 裡一個 32-bit 計數器溢位，寫篇文記錄一下。

<!-- excerpt -->

<!-- toc -->

## 症狀

- 瀏覽器一直轉圈，App 斷線，SSH 連不進去。
- `ping` 路由器、`ping 8.8.8.8` 都正常。
- 重開機就好了，但大概 50 天後又會再發生一次。

因為 `ping` 會通，很容易被誤判成 DNS 或 ISP 的問題。

## 是什麼號碼溢位？

溢位的是 XNU kernel 裡的 `tcp_now`，它是 TCP 自己用的時鐘。

- 型別：`uint32_t`，32 位元無號整數。
- 單位：開機到現在經過的毫秒數。
- 最大值：2³² − 1 = 4,294,967,295 毫秒。

換算成時間：

```
4,294,967,295 ms ≈ 49 天 17 小時 2 分 47 秒（約 49.7 天）
```

`tcp_now` 是用 `microuptime()` 算的，Mac 睡眠時不會前進。所以 49.7 天只算醒著的時間，蓋上螢幕的時間不算。

## 為什麼溢位會連不上網？

計數器溢位歸零在很多系統都會發生，本身不一定是問題。麻煩的是 macOS 更新時鐘的方式。XNU 的 `bsd/netinet/tcp_subr.c` 裡，`calculate_tcp_clock()` 長這樣（節錄）：

```c
current_tcp_now = (uint32_t)now.tv_sec * 1000 + now.tv_usec / TCP_RETRANSHZ_TO_USEC;

tmp = os_atomic_load(&tcp_now, relaxed);
if (tmp < current_tcp_now) {
	os_atomic_cmpxchg(&tcp_now, tmp, current_tcp_now, relaxed);
	/*
	 * ... The only requirement is that
	 * tcp_now never decreases.
	 */
}
```

這段檢查是為了確保 `tcp_now` 只會往前走，不會倒退。接下來會一路壞下去：

1. **時鐘卡死**：溢位後 `current_tcp_now` 從 0 重新算起，比原本接近最大值的 `tcp_now` 小很多。`tmp < current_tcp_now` 永遠不成立，`tcp_now` 就停住不動了。
2. **`TIME_WAIT` 收不掉**：TCP 連線關閉後會先進 `TIME_WAIT`，等一段時間讓殘留封包消失，再回收。這個等待是用 `tcp_now` 計時的。時鐘停了，這些連線就永遠不會過期。
3. **port 被用光**：每次開新連線，系統會配一個臨時 port（ephemeral port）。macOS 的範圍是 49152～65535，只有 16384 個。舊連線一直不釋放，port 很快就被佔滿。
4. **新的 TCP 連線全部失敗**：沒有 port 可以用，TCP 交握就開不起來。

`ping` 走的是 ICMP，不經過 TCP，也不用 port，所以還是會通。這就是這個 bug 最容易騙人的地方。

## 誰會遇到？

要同時符合兩個條件：

- **系統是 macOS Tahoe（26.x）**。Photon 一開始說所有 Mac 都會中，後來更正了。目前的說法是，Sequoia（15.x）以前的版本都沒事。
- **連續醒著超過 49.7 天**。一般筆電常更新、常重開機，很少撐到這麼久。比較容易中的是不關機的機器，像 Mac mini 伺服器、CI build 機、家裡的 media server。

Apple 有沒有修好，我寫這篇時還查不到官方確認。4 月的報導說可能會在 26.5 修，但 release notes 沒寫到。GitHub 上公開的 XNU 原始程式碼目前停在 `xnu-12377.1.9`，看不出來後面的版本有沒有改。

## 怎麼解決？

先看開機多久：

```bash
uptime
sysctl kern.boottime
```

如果已經連不上網，數一下 `TIME_WAIT` 的連線有幾條。正常只有個位數到幾百條，中了這個 bug 會一直往上加，最後接近 16384：

```bash
netstat -an -p tcp | grep -c TIME_WAIT
```

確認 ephemeral port 範圍：

```bash
sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last
```

**解法就是重開機。** 重開後 `tcp_now` 從頭算，可以再撐 49.7 天。

長時間不關機的 Mac，建議在 49 天以內排一次重開機。就算現在看起來正常也一樣，因為壞掉的那一刻沒有任何預警。

## 參考資料

- [We Found a Ticking Time Bomb in macOS TCP Networking (Photon)](https://photon.codes/blog/we-found-a-ticking-time-bomb-in-macos-tcp-networking)
- [Mac stops opening new TCP connections after ~50 days uptime (Lilting)](https://lilting.ch/en/articles/macos-497-day-tcp-now-overflow)
- [Der 49-Tage-Bug in macOS 26 Tahoe: Was wirklich dran ist (Sir Apfelot)](https://www.sir-apfelot.de/der-49-tage-bug-in-macos-26-tahoe-was-wirklich-dran-ist-69774/)
- [macOS Tahoe networking bug after 49 days uptime (greenmini.host)](https://portal.greenmini.host/help/macos-tahoe-tcp-networking-bug-after-49-days-uptime)
- [XNU 原始程式碼：bsd/netinet/tcp_subr.c](https://github.com/apple-oss-distributions/xnu/blob/main/bsd/netinet/tcp_subr.c)
