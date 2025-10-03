import joblib

'''
scikit-learn-1.7.2 needed for loading the model
'''

best_model = joblib.load("best_logReg_model.pkl")

new_review = ["The food tasted very bitter!"]

prediction = best_model.predict(new_review)[0]
proba = None

if hasattr(best_model, "predict_proba"):
    proba = best_model.predict_proba(new_review)[0]

print("Review:", new_review[0])
print("Predicted Label:", prediction)

if proba is not None:
    print("Prediction Probabilities:", proba)
