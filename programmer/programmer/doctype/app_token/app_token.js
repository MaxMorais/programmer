frappe.ui.form.on("APP Token", "refresh", function(frm){
    var tables = ["params", "session_header_params", "session_data_params"],
    i = 0,
    attr,
    fn;

    frappe.meta.get_docfield("APP Token Params", "help").options = frappe.render_template("app_token_params_help", {}); 
    for (var i in tables){
        fn = tables[i];
        attr = format("{0}_on_form_rendered", [fn])
        cur_frm.cscript[attr] = function(table){ return function(){refresh_field("help", null, table)}}(fn);
    }

    if (!frm.doc.__islocal){
        frm.add_custom_button(__("Request/Refresh oAuth Code"), function(){
            frappe.call({
                "method": "programmer.apis.oauth2.get_oauth_session",
                "args": {
                    "service": frm.doc.name,
                    "user": frappe.user.name
                }
            });
        });
    }
});