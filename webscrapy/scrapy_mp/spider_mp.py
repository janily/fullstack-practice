import requests  # 用于发起请求
import time  # 用于设置时间间隔
import csv
import pandas as pd
import pdfkit

# 构造请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'Cookie': 'appmsglist_action_3099150332=card; pgv_pvi=7105753088; RK=6dzdQ03yZn; ptcz=37ef5a93d533809bec6497fcfc9a8627369608fd5c7c80d543f77abde60066d7; pgv_pvid=6868882165; o_cookie=350600239; _ga=GA1.2.1533729352.1596162190; ua_id=payXCTpIdrzxgXkiAAAAAPMLt8Hmk24YxDctnpfR3qk=; mm_lang=zh_CN; tvfe_boss_uuid=7836d9e0015650bb; wxuin=98494377222903; gid=afed82b9-612e-45d8-8801-e8c639708164; eas_sid=i1V6O0U5y1X6S634A8V8A896p9; pgv_si=s3978343424; ptui_loginuin=350600239; uin=o0350600239; skey=@LOZgwNxgn; uuid=e4e14341027505a9dc5c789b17e32e63; ticket=e3dd8d8710efd8bb2377ce6a744a057cdaafb6a3; ticket_id=gh_7cba0d905b1a; cert=zimCE7xMoQBGCNhrlsFj_kzgtSpv4Eee; noticeLoginFlag=1; rand_info=CAESIJDi4jLHpJQWV7yEnfcCv6guoFN8TIzRwNicthEhpeV4; slave_bizuin=3099150332; data_bizuin=3079117126; bizuin=3099150332; data_ticket=ym0zzyokDnaXx9yio5uejrcVnqyDO3xFmnan8KaZD2qvsLnH7vuJvJcQg22Ed7UE; slave_sid=THNUNGRncUlCaUZBdlNqZzV5NHJsTnpPYzd1WUUwOVo0NldfS0VRV2FCTmVZN1M4QVZRQzlXWUdnSWlTdk84ckVNUGtucTdiQ3Nvb1ZDdzdnUGtuc21RQnk2Ukx6U016MkptbXNYUFZQVV9xYUU0bk1SUm5BYVV4VzVUUUdraEJpa1RaR3NFazN3UWRDclE3; slave_user=gh_7cba0d905b1a; xid=0df6cb6d0a53c56a608c5828c0d59b75; openid2ticket_oRpmHt-6iCbTIEuIONWE2kfeEz74=Ah4HHOYxYHpcTn9Qdj9aVBpaToP3/BXmADvY1i7pdWY=; rewardsn=; wxtokenkey=777'
}

# 构造查询参数
params = {
    'action': 'list_ex',
    'count': '5',
    'fakeid': 'MzI4OTU0NTU1NA==',
    'type': '9',
    'query': '',
    'token': '811859304',
    'lang': 'zh_CN',
    'f': 'json',
    'ajax': '1'
}


# 保存数据
def save_data(content_list):
    name = ['title', 'link']
    df = pd.DataFrame(columns=name, data=content_list)
    df.to_csv('data.csv', encoding='utf-8-sig')
    print('保存成功')


# 获取json数据
def get_json_data(url):
    # 将有效数据保存至列表
    content_list = []
    for i in range(20):
        params['begin'] = i * 5
        time.sleep(5)  # 设置时间间隔
        print('第{}页'.format(i))
        content_json = requests.get(url, headers=headers, params=params).json()
        for item in content_json['app_msg_list']:
            items = [item['title'], item['link']]
            # 将文章链接转换 pdf 下载到当前目录
            # pdfkit.from_url(item["link"], item["title"] + ".pdf")
            # 提取标题
            content_list.append(items)
    return content_list


def main():
    url = 'https://mp.weixin.qq.com/cgi-bin/appmsg'
    content_list = get_json_data(url)
    save_data(content_list)


if __name__ == '__main__':
    main()
