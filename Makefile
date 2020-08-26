####################
# Run from web root:
# $ make
####################
# Name our phony targets
.PHONY: all dev review production

# Default
all: default
dev: env-dev vendors done
review: permissions migrate clear optimize done
production: permissions migrate clear optimize done

default:
	@echo Please supply an environment argument \(dev, review or production\)

env-dev:
	@if ! [ -e .env ]; then \
		echo -n Creating .env...; \
		cp stubs/.env.dev .env; \
		chmod 0744 .env; \
		php artisan key:generate --quiet; \
		echo Done: .env needs to be updated before continuing; \
	fi

vendors:
	@echo -n Installing dependencies...
	@npm install
	@echo Done

done:
	@echo Ready to go!
