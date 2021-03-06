COMPRESS_JS=weddingWebsite.js
COMPRESS_CSS=style.css
SCSS_PATH=./ui/scss/
SCSS_FILE=$(SCSS_PATH)/style.scss
JS_PATH=./ui/js/
JS_FILE= \
$(JS_PATH)utils.js \
$(JS_PATH)main.js

all: $(COMPRESS_JS) $(COMPRESS_CSS)

$(COMPRESS_JS): $(JS_FILE)
	@rm -f $(COMPRESS_JS)
	@echo "COMPRESS $^ TO $@"
	@uglifyjs $(JS_FILE) -o weddingWebsite.js
	@echo "DONE"
$(COMPRESS_CSS): $(SASS_FILE)
	@rm -f $(COMPRESS_CSS)
	@echo "COMPRESS $^ TO $@"
	@compass compile
	@echo "DONE"
clean:
	@rm -f $(COMPRESS_CSS) $(COMPRESS_JS)
