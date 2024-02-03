import json
from faker import Faker

fake = Faker()

# 파일을 쓰기 모드로 엽니다.
with open("output.json", "w") as f:
    # 100번 반복합니다.
    for _ in range(100):
        data = {
            "username": fake.user_name(),
            "password": fake.password(),
            "name": fake.name(),
            "email": fake.email(),
            "phoneNum": "",
            "loginMethod": "EMAIL",
            "profileSrc": ""
        }

        # JSON 형식의 문자열로 변환합니다.
        json_data = json.dumps(data)

        # 파일에 JSON 데이터를 작성합니다.
        f.write(json_data)
        # 각 결과의 끝에 개행을 추가합니다.
        f.write("\n")