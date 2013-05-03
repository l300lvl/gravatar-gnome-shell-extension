/** Credit:
 *  taken from the gnome shell extensions repository at
 *  git.gnome.org/browse/gnome-shell-extensions
 */

const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
    Convenience.initTranslations();
}

const GravatarAvatarPrefsWidget = new GObject.Class({
    Name: 'gravatar.Prefs.Widget',
    GTypeName: 'gravatarPrefsWidget',
    Extends: Gtk.Grid,

    _init: function(params) {
        this.parent(params);
        this.margin = this.row_spacing = this.column_spacing = 10;


	let primaryText = _("This should be a registered Gravatar email address");
	this.attach(new Gtk.Label({ label: primaryText, wrap: true }), 0, 0, 2, 1);
	this.attach(new Gtk.Label({ label: '<b>' + _("Gravatar email:") + '</b>', use_markup: true }),
		    0, 1, 1, 1);
        let email = new Gtk.Entry({ hexpand: true });
        this.attach(email, 1, 1, 1, 1);

        this._settings = Convenience.getSettings();
        this._settings.bind('gravatar-email', email, 'text', Gio.SettingsBindFlags.DEFAULT);

	// let primaryText = _("Update your avatar every 'Refresh wait' number of minutes. Use 0 for no refresh during session.");
	// this.attach(new Gtk.Label({ label: primaryText, wrap: true }), 0, 0, 2, 1);
	// this.attach(new Gtk.Label({ label: '<b>' + _("Refresh wait:") + '</b>', use_markup: true }),
	// 	    0, 1, 1, 1);

        // let refresh = new Gtk.Entry({ hexpand: true });
        // this.attach(refresh, 1, 1, 1, 1);


        // this._settings = Convenience.getSettings();
        // this._settings.bind('refresh', refresh, 'text', Gio.SettingsBindFlags.DEFAULT);
        
    }

});

function buildPrefsWidget() {
    let widget = new GravatarAvatarPrefsWidget();
    widget.show_all();

    return widget;
}
