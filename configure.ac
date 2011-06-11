AC_PREREQ(2.63)
AC_INIT([zodiac-shell-extensions],[3.0.2],[https://github.com/zodiac66/shell-extensions-zodiac])

AC_CONFIG_MACRO_DIR([m4])
AC_CONFIG_AUX_DIR([config])

AM_INIT_AUTOMAKE([1.10 dist-bzip2 no-dist-gzip foreign tar-ustar])

m4_ifdef([AM_SILENT_RULES],[AM_SILENT_RULES([yes])])

GETTEXT_PACKAGE=zodiac-shell-extensions
AC_SUBST(GETTEXT_PACKAGE)
AC_DEFINE_UNQUOTED(GETTEXT_PACKAGE, "$GETTEXT_PACKAGE",
                   [The prefix for our gettext translation domains.])
IT_PROG_INTLTOOL(0.26)

PKG_PROG_PKG_CONFIG([0.22])

GLIB_GSETTINGS

dnl keep this in alphabetic order
dnl by default, install only extensions that do not change completely the shell experience,
dnl that don't require GSettings and that don't require external packages for typelibs
dnl (so basically only menus, status icons, search providers, overview tabs, message tray sources, etc.)
DEFAULT_EXTENSIONS="activitiesbutton autohidedock autohidetopbar icon-manager moveclock"
ALL_EXTENSIONS="$DEFAULT_EXTENSIONS"
AC_SUBST(ALL_EXTENSIONS, [$ALL_EXTENSIONS])
AC_ARG_ENABLE([extensions],
	[AS_HELP_STRING([--enable-extensions],[Space separated list of extensions to enable.
	The default is to build all extensions that can be installed in the home directory and have no external depedencies.
	Use "all" to enable all available extensions.])],
	[],
	[enable_extensions=$DEFAULT_EXTENSIONS]
)
if test x$enable_extensions = xall; then
   enable_extensions="$ALL_EXTENSIONS"
fi


AC_SUBST(ENABLED_EXTENSIONS, [$enable_extensions])

dnl Please keep this sorted alphabetically
AC_CONFIG_FILES([
  extensions/moveclock/Makefile
  extensions/activitiesbutton/Makefile
  extensions/autohidetopbar/Makefile
  extensions/autohidedock/Makefile
  extensions/icon-manager/Makefile
  extensions/Makefile
  Makefile
  po/Makefile.in
])
AC_OUTPUT
