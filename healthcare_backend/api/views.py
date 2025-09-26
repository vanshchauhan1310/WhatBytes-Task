from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Doctor, PatientDoctorMapping
from .serializers import UserSerializer, PatientSerializer, DoctorSerializer, PatientDoctorMappingSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class PatientListCreateView(generics.ListCreateAPIView):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Patient.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Patient.objects.filter(user=self.request.user)

class DoctorListCreateView(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

class PatientDoctorMappingListCreateView(generics.ListCreateAPIView):
    serializer_class = PatientDoctorMappingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PatientDoctorMapping.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DoctorPatientsListView(generics.ListAPIView):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        # Ensure the doctor exists
        doctor = generics.get_object_or_404(Doctor, id=doctor_id)
        # Get patients mapped to this doctor, ensuring the mapping belongs to the user
        return Patient.objects.filter(doctor_mappings__doctor=doctor, user=self.request.user)

class PatientDoctorsListView(generics.ListAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        # Ensure the patient belongs to the requesting user
        patient = generics.get_object_or_404(Patient, id=patient_id, user=self.request.user)
        # Get doctors mapped to this patient
        return Doctor.objects.filter(patient_mappings__patient=patient)

class PatientDoctorMappingDestroyView(generics.DestroyAPIView):
    serializer_class = PatientDoctorMappingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PatientDoctorMapping.objects.filter(user=self.request.user)