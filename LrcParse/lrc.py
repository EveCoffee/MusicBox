# coding=utf-8
__author__ = 'lingwanwangluo'

import re

lrc = """
[ti:匆匆那年]
[ar:王菲]
[al:电影（匆匆那年）主题曲]
[by:心灵之窗志华]
[t_time:(04:01)]

[00:00.79]电影（匆匆那年）主题曲
[00:03.13]匆匆那年
[00:05.90]演唱：王菲
[00:07.53]作曲：梁翘柏
[00:11.52]作词：林夕
[00:24.70]
[00:28.40]匆匆那年 我们究竟说了几遍
[00:31.22]再见之后再拖延
[00:33.99]可惜谁有没有爱过
[00:36.55]不是一场七情上面的雄辩
[00:39.66]匆匆那年 我们一时匆忙撂下
[00:42.47]难以承受的诺言 只有等别人兑现
[00:50.91]不怪那吻痕 还没积累成茧
[00:56.49]拥抱着冬眠 也没能羽化再成仙
[01:02.12]不怪这一段情没空反复再排练
[01:07.90]是岁月宽容恩赐 反悔的时间
[01:14.59]
[01:18.69]如果再见不能红着眼
[01:21.82]是否还能红着脸
[01:24.55]就像那年匆促刻下
[01:26.60]永远一起那样美丽的谣言
[01:29.82]如果过去还值得眷恋
[01:33.02]别太快冰释前嫌
[01:35.94]谁甘心就这样
[01:38.71]彼此无挂也无牵
[01:41.49]我们要互相亏欠
[01:47.13]要不然凭何怀念
[01:54.87]
[01:58.57]匆匆那年 我们见过太少世面
[02:01.25]只爱看同一张脸
[02:04.06]那么莫名其妙 那么讨人欢喜
[02:06.85]闹起来又太讨厌
[02:09.61]相爱那年活该匆匆
[02:12.50]因为我们不懂顽固的诺言
[02:15.25]只是分手的前言
[02:20.94]不怪那天太冷 泪滴水成冰
[02:26.60]春风也一样没吹进凝固的照片
[02:32.29]不怪每一个人没能完整爱一遍
[02:37.80]是岁月善意落下 残缺的悬念
[02:48.56]如果再见不能红着眼 是否还能红着脸
[02:54.57]就像那年匆促刻下
[02:56.56]永远一起那样美丽的谣言
[02:59.85]如果过去还值得眷恋
[03:03.08]别太快冰释前嫌
[03:05.88]谁甘心就这样
[03:08.76]彼此无挂也无牵
[03:11.02]如果再见不能红着眼
[03:14.32]是否还能红着脸
[03:17.13]就像那年匆促刻下
[03:19.04]永远一起那样美丽的谣言
[03:22.17]如果过去还值得眷恋
[03:25.50]别太快冰释前嫌
[03:28.35]谁甘心就这样
[03:31.13]彼此无挂也无牵
[03:33.96]我们要互相亏欠
[03:39.66]我们要藕断丝连
[03:46.19]

[00:00.001]好音质,天天动听!
[00:00.009]
[99:00.000]
[99:00.100]好音质,天天动听!
"""

time_list = []
content_list = []
time_now = 36.01


def parse(word=""):
    r = re.compile('\[\w{2}:\w{2}\.\w{2}\]')
    if word == "":
        return None
    word = word.replace('\n\n', '\n')
    for j in word.split('\n'):
        timelist = r.findall(j)
        if timelist:
            m, s = timelist[0].replace('[', '').replace(']', '').split(':')
            time = int(m) * 60 + float(s)
            content = j.replace(timelist[0], "")
            time_list.append(time)
            content_list.append(content)


parse(lrc)

for i in content_list:
    print i

for i in range(len(time_list)):
    if time_list[i] < time_now:
        continue
    else:
        print time_list[i], content_list[i], i
        break