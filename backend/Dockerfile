# Etapa 1: Build de la aplicación
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cachear dependencias copiando primero el POM
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar el JAR optimizado
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final liviana de ejecución
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Crear usuario sin privilegios root por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]