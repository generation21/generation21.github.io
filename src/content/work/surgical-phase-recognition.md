---
title: "로봇 수술 영상의 수술 단계 인식"
summary: "로봇 위암 절제술 영상의 매 순간이 어느 수술 단계인지 맞히는 모델을, 데이터 정제부터 학습·추론 이미지 전달까지 맡아 만든 연구 과제입니다."
period: "2019.10 – 2022.05"
company: "hutom"
role: "Deep learning Researcher · 데이터 정제, 모델 학습, 추론 전달"
order: 10
featured: false
replaces: "외과 수술 단계 인식 프로젝트"
highlights:
    - "로봇 위암 절제술 영상 100개, 27개 단계의 annotation 오류를 검사하고 학습 데이터로 변환"
    - "MMAction2로 SlowFast·I3D·ResNet3d·R(2+1)D를 3-fold 교차검증으로 비교, 앙상블 Accuracy 77.34"
    - "추론 기능을 Docker 이미지로 만들어 GCP를 통해 ML Ops 팀에 전달"
stack:
    - "MMAction2"
    - "PyTorch"
    - "Python"
    - "SlowFast"
    - "TeCNO"
    - "Docker"
    - "GCP"
---

## 배경

휴톰의 수술 영상 분석·검토 제품 Surggram에 들어갈 수술 단계 인식(Surgical Phase Recognition) 기능을 위한 연구·개발입니다. 수술 영상의 각 구간이 수술의 어느 단계인지 분류합니다.

## 내 역할

데이터 정제부터 모델 학습·추론, 추론 기능을 서버 쪽에 넘기는 것까지 맡았습니다.

## 데이터

- **로봇 위암 절제술**: 다빈치 로봇으로 진행한 수술 영상 100개입니다.
  - 27개 class: 수술 단계 21개와 비수술 구간 6개.
  - 의사 2명 이상이 annotation했습니다.
  - 나이·성별·암 진행 정도 같은 환자 상태의 비율이 비슷하도록 3-fold(학습 80 / 검증 20)를 나눴습니다.
- **로봇 담낭 절제술**: 영상 24개(학습 18 / 검증 6), 7개 class입니다.

엑셀로 된 annotation 파일의 오류를 검사하고, parser로 학습 가능한 데이터로 바꿨습니다. class별 개수, 단계 전이 횟수, class별 평균 길이 같은 통계를 뽑아 class 불균형을 확인했습니다.

annotation 원본에 문제가 있을 때는 Vision Data 팀과 함께 고쳤고, annotation이 갱신될 때마다 다시 학습했습니다.

## 모델

### 1. 3D CNN — SlowFast를 주 모델로

MMAction2로 SlowFast, I3D, ResNet3d, R(2+1)D를 학습해 비교했습니다.

- SlowFast를 주 모델로 둔 이유: 수술 영상에서는 장면(공간)과 도구의 움직임(시간)이 모두 중요해서, 두 특성을 함께 다루는 구조를 골랐습니다.
- Kinetics-700 사전학습 가중치에서 시작했고, 스케줄러는 SlowFast 논문 설정(Cosine annealing warmup, 256 epoch, SGD lr 0.01)을 그대로 썼습니다.

### 2. 추론 — clip 3개의 합으로 한 프레임을 판정

- 한 프레임의 단계는 clip 3개의 출력을 합해서 정합니다.
- clip 1개로 판정하면 성능이 약 6%p 낮았습니다.
- 영상 하나를 추론하는 데 2~4분이 걸렸고, 이 속도에 맞춰 clip 수를 3개로 정했습니다.

### 3. Action segmentation 계열

- 2D CNN(ResNet50)으로 뽑은 프레임 특징을 시간 축으로 묶어 분류하는 TeCNO를 논문을 보고 구현했습니다.
- MS-TCN, 2D CNN + LSTM도 함께 시험했습니다.

## 결과

로봇 위암 절제술, 3-fold 평균입니다.

| 모델 | Precision | Recall | F1 | Accuracy |
| --- | --- | --- | --- | --- |
| ResNet3d | 70.26 | 66.12 | 68.12 | 72.01 |
| R(2+1)D | 69.19 | 67.95 | 67.50 | 71.22 |
| I3D | 70.19 | 68.84 | 68.12 | 73.97 |
| SlowFast R50 | 71.66 | 68.99 | 68.52 | 73.48 |
| SlowFast R152 | 71.52 | 69.07 | 68.71 | 74.97 |
| 앙상블 | 73.97 | 72.32 | 71.73 | 77.34 |

로봇 담낭 절제술 데이터에서는 TeCNO 구현이 Accuracy 74.74였습니다.

## 전달

추론 기능을 Docker 이미지로 만들어 GCP를 통해 ML Ops 팀에 넘겼습니다.

## 한계

- 모든 수치는 사내 데이터의 교차검증 결과이며, 외부 데이터 재현이나 운영 지표는 없습니다.
- 기록에 남은 제 몫은 ML Ops 팀에 추론 이미지를 넘기는 데까지입니다. 이후 제품 반영과 운영은 이 사례에 포함하지 않습니다.
