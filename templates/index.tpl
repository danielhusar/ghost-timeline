{% extends 'base/_layout.tpl' %}

{% block content %}

	<div class="row">
		<div class="col-m8">
  		{% include "modules/posts/_posts.tpl" %}
  	</div>
  	<aside class="col-m4">
			{% include "modules/about/_about-me.tpl" %}
  	</aside>

{% endblock %}