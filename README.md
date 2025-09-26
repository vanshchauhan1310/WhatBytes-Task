# Healthcare Management System

A comprehensive healthcare management system built with Django REST Framework (backend) and Next.js (frontend). This application allows healthcare providers to manage patients, doctors, and their assignments efficiently.

## 🏗️ Architecture

- **Backend**: Django REST Framework with PostgreSQL
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Authentication**: JWT-based authentication with refresh tokens
- **Database**: PostgreSQL (hosted on Supabase)

## 📋 Features

### Core Functionality
- **User Authentication**: Secure login/register with JWT tokens
- **Patient Management**: Create, read, update, and delete patient records
- **Doctor Management**: Manage doctor profiles and specializations
- **Assignment System**: Assign patients to doctors and manage relationships
- **Dashboard**: Comprehensive overview of all system entities

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Token Management**: Automatic token refresh and secure cookie storage
- **Environment Configuration**: Configurable API endpoints via environment variables
- **Type Safety**: Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL database
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WhatBytes-Task
   ```

2. **Set up Python virtual environment**
   ```bash
   cd healthcare_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the `healthcare_backend` directory:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   
   # Database Configuration
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_PORT=5432
   ```

5. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
WhatBytes-Task/
├── healthcare_backend/          # Django Backend
│   ├── api/                    # Main API application
│   │   ├── migrations/         # Database migrations
│   │   ├── models.py          # Data models
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # API routes
│   ├── healthcare_backend/     # Django project settings
│   │   ├── settings.py        # Main settings
│   │   ├── urls.py            # Root URL configuration
│   │   └── wsgi.py            # WSGI configuration
│   ├── manage.py              # Django management script
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── login/         # Authentication pages
│   │   │   ├── register/      # Registration page
│   │   │   └── layout.tsx     # Root layout
│   │   ├── components/        # Reusable components
│   │   │   ├── DoctorForm.tsx
│   │   │   ├── PatientForm.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── EmptyState.tsx
│   │   └── services/          # API services
│   │       ├── api.ts         # Axios configuration
│   │       ├── authService.ts # Authentication service
│   │       ├── patientService.ts
│   │       ├── doctorService.ts
│   │       └── mappingService.ts
│   ├── package.json           # Node.js dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── .env.local             # Environment variables
│   └── .env.example           # Environment variables template
│
└── README.md                   # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/token/refresh/` - Refresh access token

### Patients
- `GET /api/patients/` - List all patients
- `POST /api/patients/` - Create new patient
- `GET /api/patients/{id}/` - Get patient details
- `PUT /api/patients/{id}/` - Update patient
- `DELETE /api/patients/{id}/` - Delete patient

### Doctors
- `GET /api/doctors/` - List all doctors
- `POST /api/doctors/` - Create new doctor
- `GET /api/doctors/{id}/` - Get doctor details
- `PUT /api/doctors/{id}/` - Update doctor
- `DELETE /api/doctors/{id}/` - Delete doctor

### Patient-Doctor Mappings
- `GET /api/mappings/` - List all mappings
- `POST /api/mappings/` - Create new mapping
- `GET /api/mappings/{patient_id}/` - Get patient's doctors
- `GET /api/doctors/{doctor_id}/patients/` - Get doctor's patients
- `DELETE /api/mappings/delete/{id}/` - Delete mapping

## 🗄️ Database Schema

### User Model
- Custom user model with email-based authentication
- Fields: `name`, `email`, `password`

### Patient Model
- Fields: `name`, `date_of_birth`, `address`, `medical_history`
- Linked to User (many-to-one relationship)

### Doctor Model
- Fields: `name`, `specialization`, `phone_number`, `email`, `address`
- Independent entity

### PatientDoctorMapping Model
- Links patients to doctors
- Fields: `user`, `patient`, `doctor`, `assigned_at`
- Unique constraint on patient-doctor pairs

## 🎨 Frontend Features

### Pages
- **Login/Register**: Authentication forms with validation
- **Dashboard**: Overview with statistics and quick actions
- **Patients**: Patient management with CRUD operations
- **Doctors**: Doctor management with CRUD operations
- **Assignments**: Patient-doctor assignment management

### Components
- **Responsive Sidebar**: Collapsible navigation with mobile support
- **Modal System**: Reusable modal for forms and confirmations
- **Form Components**: Validated forms for data entry
- **Empty States**: User-friendly empty state illustrations
- **Toast Notifications**: Real-time feedback system

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Blue Theme**: Professional healthcare color scheme
- **Lucide Icons**: Consistent iconography

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Server-side and client-side validation

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure production environment variables
3. Run migrations: `python manage.py migrate`
4. Collect static files: `python manage.py collectstatic`
5. Deploy using your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables in deployment platform

## 🧪 Development

### Backend Development
```bash
# Run development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test
```

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📦 Dependencies

### Backend Dependencies
- **Django**: Web framework
- **Django REST Framework**: API framework
- **djangorestframework-simplejwt**: JWT authentication
- **psycopg2-binary**: PostgreSQL adapter
- **python-decouple**: Environment variable management
- **django-cors-headers**: CORS handling

### Frontend Dependencies
- **Next.js**: React framework
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **Axios**: HTTP client
- **js-cookie**: Cookie management
- **react-hot-toast**: Notifications
- **lucide-react**: Icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints section

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
  - User authentication
  - Patient and doctor management
  - Assignment system
  - Responsive dashboard

---

**Built with ❤️ for healthcare management**