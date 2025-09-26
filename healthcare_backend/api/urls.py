from django.urls import path
from .views import (
    RegisterView,
    PatientListCreateView,
    PatientDetailView,
    DoctorListCreateView,
    DoctorDetailView,
    PatientDoctorMappingListCreateView,
    PatientDoctorsListView,
    PatientDoctorMappingDestroyView,
    DoctorPatientsListView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('patients/', PatientListCreateView.as_view(), name='patient-list-create'),
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('doctors/', DoctorListCreateView.as_view(), name='doctor-list-create'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),

    # Patient-Doctor Mapping URLs
    path('mappings/', PatientDoctorMappingListCreateView.as_view(), name='mapping-list-create'),
    path('mappings/<int:patient_id>/', PatientDoctorsListView.as_view(), name='patient-doctors-list'),
    path('mappings/delete/<int:pk>/', PatientDoctorMappingDestroyView.as_view(), name='mapping-delete'),

    # Doctor's Patients URL
    path('doctors/<int:doctor_id>/patients/', DoctorPatientsListView.as_view(), name='doctor-patients-list'),
]