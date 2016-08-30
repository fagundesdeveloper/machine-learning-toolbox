//render a set of points that are imported from line
//they are not passed from line, they are call in line by main and then
//passed to render through .map and they are drawn here

        let ctx = this.context
        ctx.beginPath();
        ctx.moveTo(scale * start.x, scale * start.y);
        ctx.lineTo(scale * end.x, scale * end.y);
        ctx.stroke();