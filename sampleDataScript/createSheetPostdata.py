import json
from enum import Enum
from faker import Faker
import random

fake = Faker()

class Genre(Enum):
    CAROL = 0
    K_POP = 1
    POP = 2
    NEW_AGE = 3
    CLASSIC = 4
    CUSTOM = 5
    JAZZ = 6
    DUET = 7
    GAME_ANIME = 8
    OST = 9
    BGM = 10
    KIDS = 11
    MUSICAL = 12
    RELIGIOUS = 13

class RegisterSheetDto:
    def __init__(self):
        self.title = fake.sentence()
        self.pageNum = random.randint(1, 100)
        self.difficulty = random.randint(0, 4)
        self.instrument = random.randint(0, 12)
        self.genres = sorted(random.sample(list(Genre), 2), key=lambda x: x.value)
        self.isSolo = fake.boolean()
        self.lyrics = fake.boolean()
        self.filePath = "https://picsum.photos/200"

class DummyData:
    def __init__(self):
        self.title = fake.sentence()
        self.content = fake.paragraph()
        self.price = random.randint(0, 1000)
        self.discountRate = round(random.uniform(0, 1), 2)
        self.artistId = random.randint(1, 10)
        self.sheetDto = RegisterSheetDto()

with open("sheetPostRegisterOutput.json", "w") as f:
    f.write("[\n")
    # 100번 반복합니다.
    for _ in range(1000):
# 데이터를 딕셔너리로 변환
        dummy_data = DummyData()

        data_dict = {
            "title": dummy_data.title,
            "content": f"<p>{dummy_data.content}</p>",
            "price": dummy_data.price,
            "discountRate": dummy_data.discountRate,
            "artistId": dummy_data.artistId,
            "sheetDto": {
                "title": dummy_data.sheetDto.title,
                "pageNum": dummy_data.sheetDto.pageNum,
                "difficulty": dummy_data.sheetDto.difficulty,
                "instrument": dummy_data.sheetDto.instrument,
                "genres": {
                    "genre1": dummy_data.sheetDto.genres[0].value,
                    "genre2": dummy_data.sheetDto.genres[1].value
                },
                "isSolo": dummy_data.sheetDto.isSolo,
                "lyrics": dummy_data.sheetDto.lyrics,
                "filePath": dummy_data.sheetDto.filePath
            }
        }
        json_data = json.dumps(data_dict)

            # 파일에 JSON 데이터를 작성합니다.
        f.write(json_data)
        # 각 결과의 끝에 개행을 추가합니다.
        f.write(",\n")

    f.write("]")


