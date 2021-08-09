# 대동먹지도
**목차**

#### [서비스 소개](#서비스_소개)
#### [서비스 기획 의도](#서비스_기획_의도)
#### [메인 기능](#메인_기능)
#### [팀원 참여 소감](#팀원_참여_소감)
#### [사이트 구조 개요](#사이트_구조_개요)
#### [디비 스키마 구조](#디비_스키마_구조)
#### [API 구조](#API_구조)
#### [프론트엔드 구조](#프론트엔드_구조)
#### [배포 방식](#배포_방식)

<br />

## 서비스 소개


## 서비스 기획 의도


## 메인 기능


## 팀원 참여 소감

### 김신건

### 김민정

### 이기정

### 이승환

## 사이트 구조 개요

**대동먹지도** 는 프론트엔드와 백엔드가 따로 분리되어 있는 구조입니다.

프론트엔드는 `React.js` 로 개발되었습니다.
백엔드는 `Django` 로 개발되었으며, `django-rest-framework` 를 이용한 API 서버로 구성되어있습니다.

## 디비 스키마 구조
### 서비스 모델 스키마
![서비스 모델 스키마](../backend/service_models.png)

### 전체 모델 스키마
![디비 스키마](../backend/models.png)

## API 구조

아래 API docs 사이트를 통해 쉽게 확인하실 수 있습니다.
### Swagger
- [Swagger](https://daedong-food-map-api.herokuapp.com/swagger/)

- ![Swagger Example](./swagger.jpg)

### Redoc
- [Redoc](https://daedong-food-map-api.herokuapp.com/redoc/)

- ![Redoc Example](./redoc.jpg)
## 프론트엔드 구조

### 디렉토리 구조

![front dir structure](./front_dir_structure.png)

|디렉토리명|역할|
|-|-|
| components | 사이트에 사용되는 컴포넌트들을 목적단위로 분리해두는 디렉토리입니다.|
|config| Webpack, Jest 등을 활용하기 위한 설정을 모아두는 디렉토리입니다.|
|fonts| 사이트에서 사용되는 폰트 파일들을 모아두는 디렉토리입니다.|
|hooks| 공통적으로 사용되는 커스텀 훅을 모아두는 디렉토리입니다.|
|layouts| 사이트의 레이아웃 컴포넌트를 모아두는 디렉토리입니다.|
|pages| 사이트 상의 페이지를 나타내는 컴포넌트를 모아두는 디렉토리입니다.|
|reducers| 목적단위로 state들을 따로 분리하고, 이를 관리하는 reducer들을 모아두었습니다. |
|sagas| redux-saga를 이용해 action들을 watch하고, 작업을 수행하는 목적단위로 파일들을 분리하여 모아두었습니다. |
|store| react-redux 스토어를 정의하는 파일을 분리해두는 디렉토리입니다.|
|styles| stylesheet를 모아두는 디렉토리입니다. |

### Redux & Redux-Saga

### 카카오맵


## 배포 방식

#### 백엔드
[heroku](https://www.heroku.com/)를 활용하여 자동 배포를 진행합니다.

프론트엔드와 백엔드가 같은 레포에서 관리되므로, git subtree를 만들어 배포합니다.

#### 프론트엔드

[netlify](https://www.netlify.com/)를 활용한 배포를 진행합니다.

프론트엔드 폴더 상에서 nerlify command를 이용해 배포합니다.
