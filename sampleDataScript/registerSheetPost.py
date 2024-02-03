import requests
import json
from time import sleep 

def login(userId):
    login_url = 'http://localhost:8080/user/login'
    
    with open("output.json", "r") as f:
        user = json.loads(f.read())[userId]
            # 로그인 요청을 위한 데이터
        login_data = {
            'username': user.get('username'),
            'password': user.get("password")
        }

        # 로그인 요청 보내기
        response = requests.post(login_url,data=login_data)
        # 로그인 정보
        if response.status_code == 200:
            jwt_token = response.json().get('serializedData').get('access token')
            f.close()
        
            return jwt_token
            


# 로그인이 성공하면 JWT 토큰 획득
def registerSheetPost():
    
    with open("sheetPostRegisterOutput.json", "r") as f:
        for sheet in json.loads(f.read()):
            print(sheet)
            api_url = 'http://localhost:8080/sheet/write'
            headers = {
                'Authorization': 
            }
            print(headers)
            print(json.loads(f.read())[0])  
            # JWT 토큰이 포함된 요청 보내기
            # response = requests.post(api_url, headers=headers, json=)

    # 응답 확인
    # print(response.text)

# 다음 요청을 위한 URL 및 헤더

registerSheetPost()
