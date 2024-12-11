import os
import openai

def analyze_patient_info(age, gender,bmi, habits, medical_history,family_history, previous_diagnoses, current_symptoms, recent_tests,clinical_Notes,other_info):
    try:
        openai.api_type = "<API_TYPE>"
        openai.api_base = "<API_BASE>"
        openai.api_key = "<API_KEY>"
        openai.api_version = "<API_VERSION>"

         # Safely extract descriptions
        test_descriptions = ", ".join(test.get('description', 'Unknown Test') for test in recent_tests)

        input_prompt = f"""
        You are a highly knowledgeable medical assistant. You specialize in analyzing patient summaries to predict rare and hard-to-detect diseases. Below is a summary of a patient, including their historical data, symptoms, and treatments they have undergone. Please analyze this information and provide a list of potential diseases along with the probability of each disease in JSON format.
        
        Patient Information:
        Age: {age}
        Gender: {gender}
        BMI: {bmi}
        Habits: {habits}
        Past Medical History: {', '.join(medical_history)}
        Family History: {family_history}
        Previous Diagnoses: {', '.join(previous_diagnoses)}
        Current Symptoms: {current_symptoms}
        Diagnostic Results: {test_descriptions}
        Clinical Notes : {', '.join(clinical_Notes)}
        Others: {other_info}

       please provide a list of potential diseases along with the percentage about prediction 0-100 for each disease of each disease.
       Note:  Each prediction percentage of each disease should be out of 100
       Response : Strictly follow below format:
        "<Predicted_Disease1_Name>": "<Percentage1>:<Reason1>","<Predicted_Disease2_Name>":"<Percentage2>:<Reason2>",etc
        """
        #print("Input prompt:", input_prompt)  # Debugging
        response = openai.ChatCompletion.create(
            engine="gpt-4o-mini",
            messages=[
                {"role": "user", "content": input_prompt}
            ]
        )
        #print(response['choices'][0]['message']['content'])
        return response['choices'][0]['message']['content']
    except openai.error.OpenAIError as e:
        print("OpenAI API Error:", str(e))  # Log OpenAI API errors
        raise e

    except Exception as e:
        print("General Error:", str(e))  # Log any other errors
        raise e