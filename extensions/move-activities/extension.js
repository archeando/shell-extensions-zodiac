const St = imports.gi.St;
const Main = imports.ui.main;
const Panel = imports.ui.panel;
const Gio = imports.gi.Gio;
const Gettext = imports.gettext.domain('gnome-shell');
const _ = Gettext.gettext;

// Settings
const MOVE_ACTIVITIES_SETTINGS_SCHEMA = 'org.gnome.shell.extensions.move-activities';
const MOVE_ACTIVITIES_POSITION_KEY = 'position';

// Keep enums in sync with GSettings schemas
const PositionMode = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
    HIDE: 3
};

let position = PositionMode.LEFT;

function main() {
  // Load Settings
   let _settings = new Gio.Settings({ schema: MOVE_ACTIVITIES_SETTINGS_SCHEMA });
   position = _settings.get_enum(MOVE_ACTIVITIES_POSITION_KEY);
   
   let hotCornerButton = Main.panel.button;

   let box = new St.BoxLayout({ style_class: 'activities_box'});

   // change the text string if you want to display different text
   // for the activities button
   let label = new St.Label({ text: _("Activities"),
                              style_class: 'activities_text' });

   // change the icon_name if you want to display a different icon
   // the icon must exist in the appropriate directory. For fedora, 'fedora-logo-icon'
   let logo = new St.Icon({ icon_type: St.IconType.FULLCOLOR, 
                            icon_size: hotCornerButton.height, 
                            icon_name: 'distributor-logo-icon' });

   // comment out this line if you do not want an icon displayed
   box.add_actor(logo);

   // comment out this line if you do not want the label displayed
   box.add_actor(label);
   Main.panel.button.set_child(box);
   
        //delete panelActivities
        let children = Main.panel._leftBox.get_children();
        let i=0;
        let x=0;
	while (i < children.length) {
          if ( children[i].name == 'panelActivities' ){
            Main.panel._leftBox.remove_actor(children[i]);
            x=i;
	    i=children.length;
	  }
	  i++;
	}
       switch (position) {
            case PositionMode.LEFT:
                Main.panel._leftBox.insert_actor(children[x],0);
                break;
            case PositionMode.RIGHT:
                let children_right = Main.panel._rightBox.get_children();
                Main.panel._rightBox.insert_actor(children[x],children_right.length-1);
                break;
            case PositionMode.CENTER:
                Main.panel._centerBox.insert_actor(children[x],0);
                break;            
	}
    
}
