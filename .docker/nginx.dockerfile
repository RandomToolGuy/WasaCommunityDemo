FROM nginx:alpine

LABEL author="Isak Vidinghoff" 

# Copy custom nginx config
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]