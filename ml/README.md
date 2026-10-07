# JobMax Machine Learning Engine & Datasets

This directory contains the standalone machine learning models and dataset corpus powering **JobMax**.
All models run locally and in the cloud with **zero AWS or external cloud dependencies**.

## 🧠 Models Included
1. `jds_salary_hike_model.pkl`: Predicts high vs. standard salary hike potential from 5 skill vectors.
2. `candidate_skills_classifier.joblib`: Evaluates candidate technical skill portfolio against engineering bars.
3. `candidate_personality_classifier.joblib`: Big-5 behavioral trait classifier.
4. `sds_success_model.pkl`: Long-term career trajectory & success velocity model.
5. `job_role_classifier.joblib`: Classifies job postings into `Analytics` vs. `DataScience`.

## 📊 Datasets Included
- `DataScience Jobs.csv`: 1,602 verified data science openings.
- `Analytics Jobs.csv`: 15,841 analytics and engineering openings.

## 🚀 How to Run the Backend
```bash
pip install -r requirements.txt
python main.py
```
Starts FastAPI server on `http://localhost:5000` with interactive Swagger docs at `http://localhost:5000/docs`.

## 🧪 How to Test Models
```bash
python test_api.py
```
Runs automated unit verification on all 5 models.
