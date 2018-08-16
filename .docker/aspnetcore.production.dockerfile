#Build stage
FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

# Copy .csproj files in distinct layers to cache dependencies
COPY DAL/DAL.csproj ./DAL/
COPY WasaCommunity/WasaCommunity.csproj ./WasaCommunity/
RUN dotnet restore DAL/DAL.csproj
RUN dotnet restore WasaCommunity/WasaCommunity.csproj

#Publish backend
COPY . ./
WORKDIR /app/WasaCommunity
RUN dotnet publish -c Release -o out
WORKDIR /app
COPY .docker/wait-for-it.sh ./WasaCommunity/out


# Runtime Image Stage
FROM microsoft/aspnetcore:2.0
LABEL author="Isak Vidinghoff" 
WORKDIR /app
COPY --from=build-env /app/WasaCommunity/out .
ENV ASPNETCORE_URLS=http://*:5000
RUN chmod +x wait-for-it.sh
CMD [ "dotnet", "WasaCommunity.dll" ]
