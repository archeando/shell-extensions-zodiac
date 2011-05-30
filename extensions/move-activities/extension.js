const St = imports.gi.St;
const Main = imports.ui.main;
const Panel = imports.ui.panel;

const Gettext = imports.gettext.domain('gnome-shell');
const _ = Gettext.gettext;


function main() {
    
   let hotCornerButton = Main.panel.button;

   let box = new St.BoxLayout({ style_class: 'activities_box'});

   // change the text string if you want to display different text
   // for the activities button
   let label = new St.Label({ text: _("Activities"),
                              style_class: 'activities_text' });

   // change the icon_name if you want to display a different icon
   // the icon must exist in the appropriate directory
   let logo = new St.Icon({ icon_type: St.IconType.FULLCOLOR, 
                            icon_size: hotCornerButton.height, 
                            icon_name: 'fedora-logo-icon' });

   // comment out this line if you do not want an icon displayed
   box.add_actor(logo);

   // comment out this line if you do not want the label displayed
   box.add_actor(label);

   Main.panel.button.set_child(box);

   //por ahora, solo lo borro
        let children = Main.panel._leftBox.get_children();
	let i=0;
	while (i < children.length) {
          if ( children[i].name == 'panelActivities' ){
            Main.panel._leftBox.remove_actor(children[i]);
	    i=children.length;
	  }
	  i++;
	}
}
