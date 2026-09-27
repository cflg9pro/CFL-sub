{
  "aetherCommand": "aether --bind 127.0.0.1:10820 --protocol gool --scan balanced --ip v4 --wiw-outer 162.159.192.1:2408 --wiw-inner 188.114.96.1:1701 --quick-reconnect --psiphon --psiphon-bind 127.0.0.1:10819 --psiphon-mode direct --psiphon-server-entries shipped-list",
  "dns": {
    "hosts": {
      "geosite:category-ads-all": "127.0.0.1",
      "domain:googleapis.cn": "googleapis.com",
      "dns.alidns.com": [
        "223.5.5.5",
        "223.6.6.6",
        "2400:3200::1",
        "2400:3200:baba::1"
      ],
      "dns.sse.cisco.com": [
        "208.67.220.220",
        "208.67.222.222",
        "2620:119:35::35",
        "2620:119:53::53"
      ],
      "dns.umbrella.com": [
        "208.67.220.220",
        "208.67.222.222",
        "2620:119:35::35",
        "2620:119:53::53"
      ],
      "one.one.one.one": [
        "1.1.1.1",
        "1.0.0.1",
        "2606:4700:4700::1111",
        "2606:4700:4700::1001"
      ],
      "1dot1dot1dot1.cloudflare-dns.com": [
        "1.1.1.1",
        "1.0.0.1",
        "2606:4700:4700::1111",
        "2606:4700:4700::1001"
      ],
      "dns.cloudflare.com": [
        "162.159.61.8",
        "172.64.41.8",
        "2a06:98c1:52::8",
        "2803:f800:53::8"
      ],
      "cloudflare-dns.com": [
        "104.16.248.249",
        "104.16.249.249",
        "2606:4700::6810:f8f9",
        "2606:4700::6810:f9f9"
      ],
      "engage.cloudflareclient.com": [
        "162.159.192.1",
        "2606:4700:d0::a29f:c001"
      ],
      "doh.pub": [
        "1.12.12.12",
        "120.53.53.53"
      ],
      "dot.pub": [
        "1.12.12.12",
        "120.53.53.53"
      ],
      "dns.google": [
        "8.8.8.8",
        "8.8.4.4",
        "2001:4860:4860::8888",
        "2001:4860:4860::8844"
      ],
      "dns.quad9.net": [
        "9.9.9.9",
        "149.112.112.112",
        "2620:fe::fe",
        "2620:fe::9"
      ],
      "dns.sb": [
        "45.11.45.11",
        "185.222.222.222",
        "2a09::",
        "2a11::"
      ],
      "common.dot.dns.yandex.net": [
        "77.88.8.8",
        "77.88.8.1",
        "2a02:6b8::feed:0ff",
        "2a02:6b8:0:1::feed:0ff"
      ]
    },
    "servers": [
      {
        "address": "fakedns",
        "domains": [
          "geosite:cn"
        ]
      },
      "https://dns.google/dns-query"
    ],
    "tag": "dns-module"
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 10808,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true
      },
      "sniffing": {
        "destOverride": [
          "http",
          "tls",
          "quic",
          "fakedns"
        ],
        "enabled": true,
        "routeOnly": false
      },
      "tag": "socks"
    }
  ],
  "log": {
    "loglevel": "warning"
  },
  "outbounds": [
    {
      "mux": {
        "concurrency": -1,
        "enabled": false
      },
      "protocol": "socks",
      "settings": {
        "address": "127.0.0.1",
        "port": 10819
      },
      "streamSettings": {
        "network": "tcp"
      },
      "tag": "proxy"
    },
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    },
    {
      "protocol": "dns",
      "settings": {
        "userLevel": 12
      },
      "tag": "dns-out"
    }
  ],
  "policy": {
    "levels": {
      "0": {
        "downlinkOnly": 0,
        "uplinkOnly": 0
      },
      "12": {
        "connIdle": 12,
        "downlinkOnly": 0,
        "uplinkOnly": 0
      }
    },
    "system": {
      "statsOutboundUplink": true,
      "statsOutboundDownlink": true
    }
  },
  "remarks": "bb",
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
        "inboundTag": [
          "socks"
        ],
        "outboundTag": "dns-out",
        "port": "53",
        "type": "field"
      },
      {
        "inboundTag": [
          "dns-module"
        ],
        "outboundTag": "proxy",
        "type": "field"
      },
      {
        "domain": [
          "geosite:category-ads-all"
        ],
        "outboundTag": "block",
        "type": "field"
      }
    ]
  },
  "stats": {}
}
