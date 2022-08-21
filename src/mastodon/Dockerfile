ARG MASTODON_VERSION

FROM tootsuite/mastodon:${MASTODON_VERSION}

ENV GITHUB_REPOSITORY=miaourt/rarure

COPY --chown=mastodon:mastodon styles/ /opt/mastodon/app/javascript/styles
COPY --chown=mastodon:mastodon images/ /opt/mastodon/app/javascript/images
COPY --chown=mastodon:mastodon public/ /opt/mastodon/public

RUN cd ~ \
	&& sed -i /opt/mastodon/config/themes.yml \
		-e '1iRaRuRe: styles/rarure.scss\n' \

	&& sed -i /opt/mastodon/app/javascript/styles/mailer.scss \
		-e 's/mastodon\/variables/rarure\/variables/g' \

	&& sed -i -e 's/500/1337/g' \
		/opt/mastodon/app/javascript/mastodon/features/compose/components/compose_form.js \
		/opt/mastodon/app/validators/status_length_validator.rb \
	&& sed -i /opt/mastodon/app/serializers/rest/instance_serializer.rb \
		-e '82i  def max_toot_chars\n    1337\n  end\n' \
	&& sed -i /opt/mastodon/app/serializers/rest/instance_serializer.rb \
		-e 's/ns, :ap/ns, :max_toot_chars, :ap/g' \

	&& sed -i /opt/mastodon/app/helpers/application_helper.rb \
		-e 's/https:\/\/joinmastodon.org\/#getting-started/\//g' \
		-e "s/new_user_registration_path/'\\/'/g" \

	&& grep -rl 'mastodon\|toot' /opt/mastodon/app/javascript/mastodon/locales/ /opt/mastodon/config/locales/ \
	| xargs sed -i -e '/Mastodon (/! s/Mastodon/RaRuRe/g' \
	-e '/.toot/! s/toot/post/g' -e 's/toots/posts/g' -e 's/Toot/Post/g' -e 's/Toots/Posts/g' \
	-e 's/pouet/message/g' -e 's/pouets/messages/g' -e '/.publish/! s/Pouet/Message/g' -e 's/Pouets/Messages/g' -e 's/.publish": "Pouet"/.publish": "Envoyer"/g' \

	&& OTP_SECRET=precompile_placeholder SECRET_KEY_BASE=precompile_placeholder rails assets:precompile
