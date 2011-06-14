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

function _move_clock (){

        let children  = Main.panel._leftBox.get_children();
        let i=0;
        let j=false;
        while (i<children.length) {
           if (children[i]==Main.panel._dateMenu.actor) {
                Main.panel._leftBox.remove_actor(Main.panel._dateMenu.actor);
                j=true;
                i=children.length;
           }
           i++;
        }
        if (!j) {
           children  = Main.panel._centerBox.get_children();
           i=0;
           j=false;
           while (i<children.length) {
              if (children[i]==Main.panel._dateMenu.actor) {
                 Main.panel._centerBox.remove_actor(Main.panel._dateMenu.actor);
                 j=true;
                 i=children.length;
              }
              i++;
           }
        }
           
        if (!j) {
              children = Main.panel._rightBox.get_children();
              i=0;
              j=false;
              while (i<children.length) {
                 if (children[i]==Main.panel._dateMenu.actor) {
                    Main.panel._rightBox.remove_actor(Main.panel._dateMenu.actor);
                    j=true;
                    i=children.length;
                 }
                 i++;
              }
        } 
   
        switch (position) {
            case PositionMode.LEFT:
                Main.panel._dateMenu.actor.show();
                children = Main.panel._leftBox.get_children();
                Main.panel._leftBox.insert_actor(Main.panel._dateMenu.actor, children.length-1);
                break;
            case PositionMode.RIGHT:
                Main.panel._dateMenu.actor.show();
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
            case PositionMode.CENTER:
                Main.panel._dateMenu.actor.show();
                Main.panel._centerBox.insert_actor(Main.panel._dateMenu.actor, 0);
                break;
            case PositionMode.HIDE:
                Main.panel._centerBox.insert_actor(Main.panel._dateMenu.actor, 0);
                Main.panel._dateMenu.actor.hide();
                break;           
        }

}

function _load_settings_and_refresh (){
           position = Main.panel._dateMenu._settings_position.get_enum(MOVECLOCK_POSITION_KEY);
           Main.panel._dateMenu._move_clock();
}

function main(extensionMeta) {

     // Load Settings
        Main.panel._dateMenu._settings_position = new Gio.Settings({ schema: MOVECLOCK_SETTINGS_SCHEMA });
        position = Main.panel._dateMenu._settings_position.get_enum(MOVECLOCK_POSITION_KEY);
        Main.panel._dateMenu._move_clock=_move_clock;
        Main.panel._dateMenu._load_settings_and_refresh=_load_settings_and_refresh;
        Main.panel._dateMenu._load_settings_and_refresh();
        Main.panel._dateMenu._settings_position.connect('changed::' + MOVECLOCK_POSITION_KEY, _load_settings_and_refresh);
}


