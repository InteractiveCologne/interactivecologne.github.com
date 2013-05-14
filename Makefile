build:
	jekyll
test-publish: build
	rsync -r --stats _site/ ia13@ia13.mobilecologne.de:www/
run:
	jekyll --server --auto

