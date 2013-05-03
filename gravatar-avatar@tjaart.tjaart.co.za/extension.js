/*
 * Gravatar Avatar uses your Gravatar as your Gnome Avatar
 *
 * Copyright (C) 2013  Tjaart van der Walt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const AccountsService = imports.gi.AccountsService;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const Soup = imports.gi.Soup;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const md5 = Me.imports.md5;
const Convenience = Me.imports.convenience;

let settings;

function getHomeDir() {
  global.log(GLib.get_home_dir())
  return GLib.get_home_dir();
}
function getEncodedEmail() {
  let email = settings.get_string('gravatar-email').trim();
  return md5.hex_md5(email);
}

function createGravatarDir() {
  let file = Gio.file_new_for_path(getHomeDir() + "/.gravatar_images");
  let cancellable = Gio.Cancellable.new();
  try {
    file.make_directory(cancellable);
  }
  catch (e) {
    // The directory already exists
    global.logError(e);
  }
}

function downloadGravatar() {
    let uri = Gio.file_new_for_uri( "http://www.gravatar.com/avatar/" + getEncodedEmail());
    global.log("http://www.gravatar.com/avatar/" + getEncodedEmail());
    let file = Gio.file_new_for_path(getHomeDir() + "/.gravatar_images/" + getEncodedEmail());
    try {
      uri.copy(file, Gio.FileCopyFlags.OVERWRITE, null, null);
    }
    catch (e) {
      global.logError(e);
    }
  }

function setAvatar() {
   let userManager = AccountsService.UserManager.get_default();
   let user = userManager.get_user(GLib.get_user_name());
   global.log("setAvatar");
   user.set_icon_file(getHomeDir() + "/.gravatar_images/" + getEncodedEmail());
}

function init() {
   settings = Convenience.getSettings();
}

function enable() {
  createGravatarDir();
  downloadGravatar();
  setAvatar();
}

function disable() {
}
