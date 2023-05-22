---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

- **Sedition hunters: Countering extremism through collective action**, CSCW 2021 Workshop on Addressing Challenges and Opportunities in Online Extremism Research: An Interdisciplinary Perspective 
Sukrit Venkatagiri, **Tianjiao Yu**, Vikram Mohanty, Kurt Luther 
[paper](https://par.nsf.gov/servlets/purl/10315695)


{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
