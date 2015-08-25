
import frappe

@frappe.whitelist()
def authorized(code=None, state=None, **kw):
    from programmer.doctype.app_token.app_token import _store_oauth_token
    return _store_oauth_token(code, state)