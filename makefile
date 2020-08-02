-include environments/.env

## ------------------------------------- ENVIRONMENT -------------------------------------

# General
ENVIRONMENT          ?= dev
APP_DIR               = app
OWNER                 = marketplace
SERVICE_TYPE          = spa
SERVICE_NAME          = template
PROJECT_NAME          = $(OWNER)-$(SERVICE_TYPE)-$(SERVICE_NAME)

# Proyecto GCP
GCP_PROJECT_ID        = pe-gcp-marketplace-01
GCP_SERVICE_ACCOUNT   = pe-gcp-marketplace-01@appspot.gserviceaccount.com
GCP_CREDENTIALS       = gcp-credentials.json

# Storage GCP
GCP_BUCKET_NAME      ?= storuse1$(ENVIRONMENT)01

## ------------------------------------- TASK ------------------------------------------

# Activar cuenta de servicio en GCP
login:
	gcloud auth activate-service-account $(GCP_SERVICE_ACCOUNT) \
		--key-file=$(GCP_CREDENTIALS) --project=$(GCP_PROJECT_ID)

# Descargar variables de entorno
sync-environments:
	rm -rf environments/	&& \
	gsutil cp gs://$(GCP_BUCKET_NAME)/config/$(PROJECT_NAME)/environments/.env ./environments/.env

# Instalar dependencias
install:
	cd app/	&& \
	npm install

# Construir aplicación
build:
	cd app/	&& \
	npm run client:build

# Subir archivos al Storage GCP
uploading-files:
	gsutil cp -r app/dist gs://$(GCP_BUCKET_NAME)/resources/$(PROJECT_NAME)/	&& \
	bash scripts/permission.sh make_public

# Permiso de acceso Público
accessing-public-data:
	gsutil acl ch -u AllUsers:R gs://$(GCP_BUCKET_NAME)/resources/$(PROJECT_NAME)/dist/$(NAME_FILE)

# Ejecutar local
start:
	cd app/ && \
	npm run client:start