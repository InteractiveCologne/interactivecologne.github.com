build:
	jekyll
#publish: build
#	rsync -r --stats _site/ user@server:www/
run:
	jekyll --server --auto

