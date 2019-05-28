import re


def manipulate_template(template, **kwargs):

    res = template

    contact = kwargs.get('contact', None)

    if contact:
        contact_name = f'{contact.first_name} {contact.last_name}'
        res = re.sub(r'\$contact_name\$', contact_name, res)

    return res
