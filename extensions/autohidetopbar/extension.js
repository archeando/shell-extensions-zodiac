/*
* Part of code is: Copyright (c) 2011 Finnbarr P. Murphy
* Copyright (c) 2011 Miguel Aguilar <zodiac_es@yahoo.es>
*
* This is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 2 of the License, or
* any later version.
*
* This file is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with gnome-shell-extensions-zodiac If not, see <http://www.gnu.org/licenses/>.
*
*
*/

const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Overview = imports.ui.overview;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const PANEL_HEIGHT = Main.panel.actor.height;
const AUTOHIDE_ANIMATION_TIME = 0.1;
const TIME_DELTA = 500;


function _hidePanel() {
    if (!Main.overview.visible && Main.panel.hideable == true) {
        Tweener.addTween(Main.panel._boxContainer,
                     { opacity: 0,
                       time: AUTOHIDE_ANIMATION_TIME+0.1,
                       transition: 'easeOutQuad'
                     });
        Tweener.addTween(Main.panel.actor,
                     { height: 1,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });
        Main.panel.hidden = true;
    }
}

function _showPanel() {
    if (Main.panel.hidden == true) {

        Tweener.addTween(Main.panel.actor,
                     { height: PANEL_HEIGHT,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad'
                     });

        Tweener.addTween(Main.panel._boxContainer,
                     { opacity: 255,
                       time: AUTOHIDE_ANIMATION_TIME+0.1,
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

   Main.panel.hideable = !Main.panel.hideable;
   Main.panel.hidetime = 0;
   
   Tweener.addTween(Main.panel._boxContainer,
                     { opacity: 0,
                       time: AUTOHIDE_ANIMATION_TIME,
                       transition: 'easeOutQuad',
                       onComplete: function() { Tweener.addTween(Main.panel._boxContainer,
                                                         {opacity: 255,
		                                          time: AUTOHIDE_ANIMATION_TIME,
                                                          transition: 'easeOutQuad'}); 
                                              } 
                     });
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
