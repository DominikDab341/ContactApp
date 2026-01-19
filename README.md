# 📇 Contact Manager with Weather Integration

Aplikacja typu CRM do zarządzania kontaktami, zintegrowana z danymi pogodowymi dla miast, w których mieszkają Twoi znajomi. Projekt oparty jest na **Django REST Framework** (Backend) oraz **React** (Frontend).

---

## ✨ Główne funkcje

- **Pełny CRUD**: dodawanie, wyświetlanie, edycja i usuwanie kontaktów.
- **Integracja z pogodą**: każdy kontakt automatycznie pobiera **aktualną temperaturę** i **prędkość wiatru** na podstawie przypisanego miasta.
- **Paginacja**: czytelna prezentacja danych – maksymalnie **4 kafelki na stronę**.
- **Filtrowanie**:
  - wyszukiwanie kontaktów po **nazwisku**,
  - filtrowanie po **dacie utworzenia** bezpośrednio na froncie.
- **Bezpieczeństwo danych**: unikalność **numeru telefonu** i **adresu e-mail** jest sprawdzana w obrębie konta danego użytkownika (różni użytkownicy mogą mieć te same dane w swoich bazach).

---

## 🛠 Technologie

### Backend
- Python 3.12 / Django
- Django REST Framework
- SQLite (domyślna baza danych)

### Frontend
- React 18+


---

## 🚀 Instalacja i uruchomienie

### 1) Backend (Django)
1. Wejdź do folderu backendu:
   ```bash
   cd backend
   ```

2. **Utwórz i aktywuj środowisko wirtualne**

   ```bash
   python -m venv .venv
   source .venv/bin/activate        # Linux / macOS
   .venv\Scripts\activate           # Windows
   ```

3. **Zainstaluj zależności**

   ```bash
   pip install -r requirements.txt
   ```
   ```

4. **Wykonaj migracje bazy danych**

   ```bash
   python manage.py migrate
   ```

5. **Stwórz konto administratora**

   ```bash
   python manage.py createsuperuser
   ```

6. **Dodaj do bazy status "Nowy"**
    - Zrób to za pomocą panelu admina

7. **Uruchom serwer deweloperski**

   ```bash
   python manage.py runserver
   ```

### 1) Frontend (React)
1. Wejdź do folderu frontend:
   ```bash
   cd frontend
    ```

2. **Zainstaluj zależności**
   ```bash
   npm install
    ```

3. **Skopiuj .env.example i wypełnij**

4. **Uruchom aplikacje**
   ```bash
   npm start dev
    ```