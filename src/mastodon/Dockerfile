ARG MASTODON_VERSION

FROM tootsuite/mastodon:${MASTODON_VERSION}

ENV GITHUB_REPOSITORY=miaourt/rarure
#ENV SOURCE_TAG=main

# Copy RaRuRe's custom style
COPY --chown=mastodon:mastodon styles/ /opt/mastodon/app/javascript/styles

# Copy RaRuRe's custom images
COPY --chown=mastodon:mastodon images/ /opt/mastodon/app/javascript/images

# Copy RaRuRe's custom public
COPY --chown=mastodon:mastodon public/ /opt/mastodon/public

RUN cd ~ \
	#
	# Add RaRuRe theme option
	#
	&& sed -i -e '1iRaRuRe: styles/rarure.scss\n' /opt/mastodon/config/themes.yml \
	#
	# Change email theme
	#
	&& sed -i -e 's/mastodon\/variables/rarure\/variables/g' /opt/mastodon/app/javascript/styles/mailer.scss \
	#
	# Change post characters limit
	#
	&& sed -i -e 's/500/1312/g' \
	   /opt/mastodon/app/javascript/mastodon/features/compose/components/compose_form.js \
	   /opt/mastodon/app/validators/status_length_validator.rb \
	&& sed -i -e '82i  def max_toot_chars\n    1312\n  end\n' \
	   /opt/mastodon/app/serializers/rest/instance_serializer.rb \
	&& sed -i -e 's/ns, :ap/ns, :max_toot_chars, :ap/g' \
	   /opt/mastodon/app/serializers/rest/instance_serializer.rb \
	#
	# Edit some links
	#
	&& sed -i -e 's/https:\/\/joinmastodon.org\/#getting-started/\//g' \
	          -e "s/new_user_registration_path/'\\/'/g" \
	   /opt/mastodon/app/helpers/application_helper.rb \
	#
	# Replace Mastodon occurences with RaRuRe, and "Toots" with more standards terms
	#
	&& grep -rl 'mastodon\|toot' /opt/mastodon/app/javascript/mastodon/locales/ /opt/mastodon/config/locales/ \
		| xargs sed -i -e '/Mastodon (/! s/Mastodon/RaRuRe/g' \
		# English
		-e '/.toot/! s/toot/post/g' -e 's/toots/posts/g' -e 's/Toot/Post/g' -e 's/Toots/Posts/g' \
		# French
		-e 's/pouet/message/g' -e 's/pouets/messages/g' -e '/.publish/! s/Pouet/Message/g' -e 's/Pouets/Messages/g' -e 's/.publish": "Pouet"/.publish": "Envoyer"/g' \
		#
	&& OTP_SECRET=precompile_placeholder SECRET_KEY_BASE=precompile_placeholder rails assets:precompile
