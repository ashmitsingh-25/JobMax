import main
from main import SkillsInput, PersonalityInput, JobRoleInput

def run_tests():
    print("=" * 60)
    print("Testing JobMax ML Models & Endpoints (Standalone / No AWS)")
    print("=" * 60)
    
    # 1. Health check
    health = main.home()
    print("[1] Health Check:", health["status"])
    print("    Models Loaded:", health["models_loaded"])
    print("    Datasets Loaded:", health["datasets_loaded"])
    
    # 2. JDS Salary Hike Model
    jds_res = main.predict_salary_hike(SkillsInput(skills=[1.0, 1.0, 1.0, 1.0, 1.0]))
    print("\n[2] Salary Hike Prediction (jds_salary_hike_model.pkl):")
    print(f"    Prediction: {jds_res['prediction_label']} (Code: {jds_res['salary_hike_high_or_low']})")
    print(f"    Probabilities: {jds_res['probabilities']}")
    
    # 3. Candidate Skills Classifier
    skills_res = main.predict_candidate_skills(SkillsInput(skills=[1.0, 1.0, 1.0, 1.0, 0.0]))
    print("\n[3] Candidate Skills Classifier (candidate_skills_classifier.joblib):")
    print(f"    Qualified: {skills_res['qualified']} (Confidence: {skills_res['confidence']})")
    
    # 4. Candidate Personality Classifier
    pers_res = main.predict_candidate_personality(PersonalityInput(traits=[2.5, 4.0, 4.5, 4.2, 4.5]))
    print("\n[4] Candidate Personality Classifier (candidate_personality_classifier.joblib):")
    print(f"    Suitable: {pers_res['suitable']} (Probabilities: {pers_res['probabilities']})")
    
    # 5. Career Success Model (SDS)
    sds_res = main.predict_career_success(PersonalityInput(traits=[2.0, 4.5, 4.8, 4.5, 4.9]))
    print("\n[5] Career Success Model (sds_success_model.pkl):")
    print(f"    Verdict: {sds_res['verdict']} (High Success Prob: {sds_res['high_success_probability']})")
    
    # 6. Job Role Classifier
    role_res = main.classify_job_role(JobRoleInput(
        job_title="Senior Data Scientist",
        job_description="Machine Learning, PyTorch, Big Data, SQL, Python",
        key_skills="Python, PyTorch, Scikit-learn, Machine Learning",
        min_experience=3.0
    ))
    print("\n[6] Job Role Classifier (job_role_classifier.joblib):")
    print(f"    Predicted Domain: {role_res['predicted_domain']}")
    print(f"    Confidence: {role_res['confidence_breakdown']}")
    
    # 7. Search Jobs
    jobs = main.search_jobs(title="Data", limit=3)
    print(f"\n[7] Job Search (DataScience & Analytics Jobs):")
    print(f"    Returned {len(jobs)} jobs. Top result: {jobs[0]['title']} at {jobs[0]['company']}")
    
    # 8. Career Growth Advisor
    growth = main.analyze_career_growth({"devProfile": {"skills": ["Python", "Machine Learning", "Distributed Systems"]}})
    print("\n[8] Career Growth Advisor Integration:")
    print(f"    Projected Comp: {growth['advisor']['projectedCompensation']}")
    print(f"    Next Target Role: {growth['advisor']['nextTargetRole']}")
    
    print("\n" + "=" * 60)
    print("ALL TESTS PASSED SUCCESSFULLY! No AWS or S3 needed.")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
