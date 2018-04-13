const renderStats = (data) => data.map((it) => `<li class='stats__result stats__result--${it}'></li>`).join(``);

export default (data) =>
  `<ul class='stats'>
    ${renderStats(data)}
   </ul>`;
