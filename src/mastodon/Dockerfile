ARG MASTODON_VERSION=v4.2.0

FROM ghcr.io/mastodon/mastodon:${MASTODON_VERSION}

ENV GITHUB_REPOSITORY=miaourt/rarure

COPY --chown=mastodon:mastodon styles/ /opt/mastodon/app/javascript/styles
COPY --chown=mastodon:mastodon images/ /opt/mastodon/app/javascript/images
COPY --chown=mastodon:mastodon icons/ /opt/mastodon/app/javascript/icons
COPY --chown=mastodon:mastodon public/ /opt/mastodon/public

COPY --chown=mastodon:mastodon components/ /opt/mastodon/app/javascript/mastodon/components
COPY --chown=mastodon:mastodon helpers/ /opt/mastodon/app/helpers

RUN cd ~ \
	&& sed -i /opt/mastodon/config/themes.yml \
		-e '1iRaRuRe: styles/rarure.scss\n' \
	&& sed -i /opt/mastodon/app/javascript/styles/mailer.scss \
		-e 's/mastodon\/variables/rarure\/variables/g' \
	&& sed -i -e 's/500/21043/g' \
		/opt/mastodon/app/javascript/mastodon/features/compose/components/compose_form.jsx \
		/opt/mastodon/app/validators/status_length_validator.rb \
	&& sed -i -e "s/'domain'/'title'/g" \
		/opt/mastodon/app/javascript/mastodon/initial_state.js \
		/opt/mastodon/app/javascript/mastodon/features/about/index.jsx \
	&& sed -i /opt/mastodon/app/javascript/styles/mastodon/variables.scss \ 
		-e 's/; \/\/ Iris/ !default; \/\/ Iris/g' \
		-e 's/; \/\/ Brand purple/ !default; \/\/ Brand purple/g' \
		-e 's/; \/\/ Medium slate blue/ !default; \/\/ Medium slate blue/g' \
		-e 's/; \/\/ Faded Blue/ !default; \/\/ Faded Blue/g' \
		-e 's/; \/\/ Trout/ !default; \/\/ Trout/g' \
		-e 's/; \/\/ Topaz/ !default; \/\/ Topaz/g' \
	&& OTP_SECRET=precompile_placeholder SECRET_KEY_BASE=precompile_placeholder rails assets:precompile
