from rest_framework import serializers
from .models import User, Patient, Doctor, PatientDoctorMapping

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'name', 'date_of_birth', 'address', 'medical_history', 'created_at', 'updated_at')
        read_only_fields = ('user',)

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'specialization', 'phone_number', 'email', 'address', 'created_at', 'updated_at')

class PatientDoctorMappingSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(), source='patient', write_only=True
    )
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), source='doctor', write_only=True
    )

    class Meta:
        model = PatientDoctorMapping
        fields = ('id', 'patient', 'doctor', 'patient_id', 'doctor_id', 'assigned_at')
        read_only_fields = ('user',)

    def validate(self, data):
        # Ensure the patient belongs to the authenticated user
        if data['patient'].user != self.context['request'].user:
            raise serializers.ValidationError("You can only assign doctors to your own patients.")
        return data