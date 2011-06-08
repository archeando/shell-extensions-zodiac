//
//  Copyright (c) 2011 Finnbarr P. Murphy
//

const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Overview = imports.ui.overview;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const PANEL_HEIGHT = 25;
const AUTOHIDE_ANIMATION_TIME = 0.4;
const TIME_DELTA = 1500;


function _hidePanel() {
    if (!Main.overview.visible && Main.panel.hideable == true) {
        Tweener.addTween(Main.panel.actor,
                     { height: 1,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._leftCorner.actor,
                     { y: 0,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._rightCorner.actor,
                     { y: 0,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._boxContainer,
                     { opacity: 0,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Main.panel.hidden = true;
    }
}

function _showPanel() {
    if (Main.panel.hidden == true) {
        Tweener.addTween(Main.panel._leftCorner.actor,
                     { y: PANEL_HEIGHT -1,
                       time: AUTOHIDE_ANIMATION_TIME+0.2,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._rightCorner.actor,
                     { y: PANEL_HEIGHT -1,
                       time: AUTOHIDE_ANIMATION_TIME+0.2,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._boxContainer,
                     { opacity: 255,
                       time: AUTOHIDE_ANIMATION_TIME+0.2,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel.actor,
                     { height: PANEL_HEIGHT,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Main.panel.hidden = false;
    }
}

function _toggleHideable(actor, event) {

   let ticks = event.get_time();

   if (Main.panel.hidetime == 0) {
      Main.panel.hidetime = ticks;
      return;
   }

   if ( (ticks - Main.panel.hidetime) > TIME_DELTA) {
      Main.panel.hidetime = 0;
      return;
   }

   if (Main.panel.hideable == true)
       Main.panel.hideable = false;
   else
       Main.panel.hideable = true;

   Main.panel.hidetime = 0;
}


function main() {
 
    Main.panel.hidden = false;               
    Main.panel.hideable = false;
    Main.panel.hidetime = 0;

    Main.panel._hidePanel = _hidePanel;
    Main.panel._showPanel = _showPanel;
    Main.panel._toggleHideable = _toggleHideable;

    Main.panel.actor.connect('leave-event', Lang.bind(Main.panel, Main.panel._hidePanel));
    Main.panel.actor.connect('enter-event', Lang.bind(Main.panel, Main.panel._showPanel));
    Main.panel.actor.connect('button-release-event', Lang.bind(Main.panel, Main.panel._toggleHideable));

}
