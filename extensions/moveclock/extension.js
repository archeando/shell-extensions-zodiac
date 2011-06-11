/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

const Main = imports.ui.main;
const Gio = imports.gi.Gio;
const Gettext = imports.gettext.domain('shell-extensions-zodiac');
const _ = Gettext.gettext;


// Settings
const MOVECLOCK_SETTINGS_SCHEMA = 'org.gnome.shell.extensions.moveclock';
const MOVECLOCK_POSITION_KEY = 'position';

// Keep enums in sync with GSettings schemas
const PositionMode = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
    HIDE: 3
};

let position = PositionMode.CENTER;

function main(extensionMeta) {

     // Load Settings
        let _settings = new Gio.Settings({ schema: MOVECLOCK_SETTINGS_SCHEMA });
        position = _settings.get_enum(MOVECLOCK_POSITION_KEY);

        let children  = null;
        switch (position) {
            case PositionMode.LEFT:
                children = Main.panel._leftBox.get_children();
                Main.panel._centerBox.remove_actor(Main.panel._dateMenu.actor);
                Main.panel._leftBox.insert_actor(Main.panel._dateMenu.actor, children.length-1);
                break;
            case PositionMode.RIGHT:
                Main.panel._centerBox.remove_actor(Main.panel._dateMenu.actor);
                children = Main.panel._rightBox.get_children();
                let i=0;
                while ((children[i].name != 'panelStatus') && (i < children.length) ) {
                    i++;
                }
                if (i == children.length) {
                        i= children.length-1;
                }
                Main.panel._rightBox.insert_actor(Main.panel._dateMenu.actor, i);
                break;
            case PositionMode.HIDE:
                Main.panel._centerBox.remove_actor(Main.panel._dateMenu.actor);
                break;           
        }
}


