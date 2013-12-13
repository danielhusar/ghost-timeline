<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1">

  {% include "base/_variables.tpl" %}

  <link rel="canonical" href="#">

  <title>{% block title %}Bootstrap{% endblock %}</title>

  <link rel="stylesheet" href="css/style.{% if isProduction %}min.{% endif %}css">

  <!--[if (lt IE 9)&(!IEMobile)]>
    <link rel="stylesheet" href="/css/IE.{% if isProduction %}min.{% endif %}css">
  <![endif]-->

  <script src="js/libraries/modernizr-2.7.0.min.js"></script>
</head>
<body id="page-{{ pageId }}">
  <!--[if lt IE 8]>
      <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
  <![endif]-->
  <div id="wrap">
    {% include "modules/header/_header.tpl" %}
    <main role="main" class="main clearfix">
      {% block content %}{% endblock %}
    </main>
  </div>
  {% include "modules/footer/_footer.tpl" %}

  <!--[if lt IE 9]>
    <script src="js/libraries/jquery.1.9.0.min.js"></script>
  <![endif]-->
  <!--[if gte IE 9]><!-->
    <script src="js/libraries/jquery-2.0.3.min.js"></script>
  <!--<![endif]-->


  {% if isProduction %}
    <script src="js/plugins.min.js"></script>
    <script src="js/app.min.js"></script>
  {% else %}
    <!--
      All plugins, core and modules js files.
      On prod all this will be concated and minified into plugins.min.js and app.min.js
    -->

    <!-- polyfills -->
    <script src="js/libraries/polyfills.js"></script>

    <!-- plugins -->
    <script src="js/plugins/jQuery.lazyLoad.js"></script>

    <!-- core -->
    <script src="js/app/global.js"></script>
    <script src="js/app/settings.js"></script>
    <script src="js/app/promises.js"></script>
    <script src="js/app/events.js"></script>

    <!-- modules -->
    <script src="js/modules/portfolio.js"></script>
    <!-- yeoman slug -->

    <!-- main init -->
    <script src="js/app/init.js"></script>
  {% endif %}

</body>
</html>