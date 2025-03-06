# 📌 Next + Spring Boot + PostgreSQL Application

## 🧐 Getting Started
This is the guide for setup and run this application.

---

## ❗❗ Prerequisites 

Ensure you have the following installed on your system:
- **Java 17+** (JDK)
- **Maven** (For dependency management)
- **PostgreSQL**(Database)
- **pgAdmin** (Optional GUI for PostgreSQL)
- **Git** (For version control)
---
## 💻⚙ Installation & Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-repo-name.git
 cd your-repo-name
```

### 2️⃣ Configure PostgreSQL Database
1. **Create a new database:**
   ```sql
   CREATE DATABASE demo;
   ```
2. **Create a new user & grant privileges:**
   ```sql
   CREATE USER user WITH PASSWORD 'new_secure_password';
   ALTER ROLE user SET client_encoding TO 'utf8';
   ALTER ROLE user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE demo TO user;
   ```

### 3️⃣ Update `application.properties` (or `application.yml`)
Modify `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/demo
spring.datasource.username=user
spring.datasource.password=new_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---
## ▶️ Running the Application
### Using Maven
```sh
mvn spring-boot:run
```

### Using Java
```sh
java -jar target/your-app.jar
```

---
## 🔎 API Endpoints
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/api/tasks`    | Get all tasks |
| POST   | `/api/tasks`    | Add a new task |


---
## 🛠 Troubleshooting
### 🔴 Unable to Connect to PostgreSQL
If you see `FATAL: password authentication failed for user "user"`, reset the password:
```sh
psql -U postgres
ALTER USER user WITH PASSWORD 'new_secure_password';
```
Then restart PostgreSQL:
```sh
sudo systemctl restart postgresql
```
---
## 👨‍💻 Author
- **H D Sithum Sandaruwan** - [sithum-sandaruwan](https://github.com/sithum-sandaruwan)



