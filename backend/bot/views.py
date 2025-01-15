import google.generativeai as genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import os

class BotQueryAPIView(APIView) :
    def post(self , request ) :
         genai.configure(api_key=settings.GEMINI_API_KEY)
         model = genai.GenerativeModel("gemini-1.5-flash")
         user_query = request.data.get('query','')
         knowledge_base_path = os.path.join(settings.BASE_DIR,'knowledge_base.txt')
         try :
             with open(knowledge_base_path,'r') as f :
                 knowledge_base = f.read()
         except FileNotFoundError :
             return Response({'error':'Knowledge base not found'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
         prompt =f"""
         Knowledge Base :
          {knowledge_base}
         Question :
         {user_query}
         Answer :
         """
         response = model.generate_content(prompt)
         return Response({'message':response.text},status=status.HTTP_200_OK)