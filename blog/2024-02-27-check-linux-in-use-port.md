---
slug: check-linux-in-use-port
title: How do I check if a port is in use on Linux?
authors: [mikimoto]
tags: [linux, system]
---

常常有時候要查 Linux 使用 port 的狀況，來確定 service 是否正常，就還要用 man 去查參數，寫篇文紀錄一下。

<!-- truncate -->

<!-- toc -->

## 檢查 Linux 目前使用的 port

1. 使用以下 command

```bash
sudo lsof -i -P -n | grep LISTEN
sudo netstat -tulpn | grep LISTEN
sudo netstat -tulpn | grep :443
sudo ss -tulpn | grep LISTEN
sudo ss -tulpn | grep ':22'
sudo fuser -v -n tcp 443
```

2. 從 /etc/services 搜尋，把 PORT_NUMBER_HERE 換成要搜尋的 port

```bash
grep -E -w '[PORT_NUMBER_HERE]/(tcp|udp)' /etc/services
```

## 搜尋哪一個 process 正在 listening port 443

```bash
sudo netstat -tulpn | grep :443
sudo ss -tulpn | grep ':443'
```

## 取得所有 open port 的清單

```bash
sudo lsof -i -P -n | grep LISTEN
sudo ss -tulpn
sudo netstat -tulpn
```

Sample outputs:

```Shell
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      500/redis-server 12
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      438/nginx -g daemon
tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN      407/lighttpd    
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      438/nginx -g daemon
tcp6       0      0 :::80                   :::*                    LISTEN      438/nginx -g daemon
udp        0      0 0.0.0.0:68              0.0.0.0:*                           277/dhclient
```

## Use fuser command to check if a TCP or UDP port is in use on Linux

```bash
sudo fuser -v -n <protocol> <port>
```

Ex: 檢查 SSHD (port 22) is in use:

```bash
sudo fuser -v -n tcp 22
```

Outputs:

```Shell
                     USER        PID ACCESS COMMAND
22/tcp:              root        663 F.... sshd
                     root       9877 F.... sshd
                     ubuntu     9992 F.... sshd
```

Ex: 檢查 DNS Server (port 53) UDP port is in use:

```bash
sudo fuser -nv udp 53
```

Outputs:

```Shell
53/udp:                392  1189
```

## Use nc command 來檢查 TCP or UDP port is used

Try the nc command as follows to scan the open ports (TCP/22 ssh port) of a specified host (10.8.0.1):

```bash
nc -v -z <ip_address> <port>
nc -v -z 10.8.0.1 22
```

Outputs:

```Shell
Connection to 10.8.0.1 22 port [tcp/ssh] succeeded!
```

不過如果你在防火牆(block port 22)背後，則 Output 會變成以下這樣

```Shell
nc: connect to 10.8.0.1 port 23 (tcp) failed: Connection refused
```
