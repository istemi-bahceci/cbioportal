/*
 * Copyright (c) 2012 Memorial Sloan-Kettering Cancer Center.
 * This library is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the License, or
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  The software and
 * documentation provided hereunder is on an "as is" basis, and
 * Memorial Sloan-Kettering Cancer Center
 * has no obligations to provide maintenance, support,
 * updates, enhancements or modifications.  In no event shall
 * Memorial Sloan-Kettering Cancer Center
 * be liable to any party for direct, indirect, special,
 * incidental or consequential damages, including lost profits, arising
 * out of the use of this software and its documentation, even if
 * Memorial Sloan-Kettering Cancer Center
 * has been advised of the possibility of such damage.  See
 * the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation,
 * Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
 */

var plotsTab = (function() {
    
    var append_view_switch_opt = function() {
        $("#" + ids.sidebar.util.view_switch).empty();

        var stat = plotsData.stat();
        var tmp = setInterval(function () {timer();}, 1000);
        function timer() {
            if (metaData.getRetrieveStatus() !== -1 && stat.retrieved) {
                clearInterval(tmp);
                append();
            }
        }
        function append() {
            if (genetic_vs_genetic()) {
                if(isSameGene()) {
                    if (stat.hasCnaAnno) {
                        $("#" + ids.sidebar.util.view_switch).append(
                            "<h5>View</h5>" + 
                            "<input type='radio' value='mutation_details' name='mutation_details_vs_gistic_view' checked>Mutation Details" + 
                            "<input type='radio' value='gistic' name='mutation_details_vs_gistic_view' >GISTIC"
                        );                    
                    }
                }                
            }
        }
    };
    
    return {
        init: function() {
            
            //init logic
            $("#" + ids.main_view.div).empty();
            appendLoadingImg(ids.main_view.div);

            metaData.fetch(); 
            sidebar.init();
            plotsData.fetch("x");
            plotsData.fetch("y");
            plotsbox.init();
            append_view_switch_opt();
            
            //apply event listening logic
            $( "#" + ids.sidebar.x.div ).bind({
                change: function() {
                    $("#" + ids.main_view.div).empty();
                    appendLoadingImg(ids.main_view.div);
                    plotsData.fetch("x");
                    append_view_switch_opt();
                    plotsbox.init();
                }
            });
            $( "#" + ids.sidebar.y.div ).bind({
                change: function() {
                    $("#" + ids.main_view.div).empty();
                    appendLoadingImg(ids.main_view.div);
                    plotsData.fetch("y");
                    append_view_switch_opt();
                    plotsbox.init();
                }
            });
            $("#" + ids.sidebar.util.view_switch).bind({
                change: function() {
                    $("#" + ids.main_view.div).empty();
                    appendLoadingImg(ids.main_view.div);
                    plotsData.fetch("x");
                    plotsData.fetch("y");
                    plotsbox.init();
                }
            });
            
        }
        
    };
}());
