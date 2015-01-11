COMPRESS_JS=weddingWebsite.js
COMPRESS_CSS=./ui/css/style.css
SASS_PATH=./ui/sass/
SASS_FILE=$(SASS_PATH)/style.scss
JS_PATH=./ui/js/
JS_FILE=$(JS_PATH)main.js

all: $(COMPRESS_JS) $(COMPRESS_CSS)

$(COMPRESS_JS): $(JS_FILE)
	@rm -f $(COMPRESS_JS)
	@echo "COMPRESS $^ TO $@"
	@uglifyjs $(JS_FILE) -o weddingWebsite.js
	@echo "Done"
$(COMPRESS_CSS): $(SASS_FILE)
	@rm -f $(COMPRESS_CSS)
	@echo "COMPRESS $^ TO $@"
	@compass compile
	@echo "Done"
clean:
	@rm -f $(COMPRESS_CSS) $(COMPRESS_JS)