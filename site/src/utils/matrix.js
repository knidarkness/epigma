
class Matrix {
    /* _ _ _ _ _
    * | a  c  e |
    * | b  d  f |
    * |_0_ 0 _1_|
    */
    constructor(a, b, c, d, e, f){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.determinant = this.a * this.d - this.b * this.c;
    }

    multiply(m) {
        return new Matrix(
            this.a * m.a + this.c * m.b,
            this.b * m.a + this.d * m.b,
            this.a * m.c + this.c * m.d,
            this.b * m.c + this.d * m.d,
            this.a * m.e + this.c * m.f + this.e,
            this.b * m.e + this.d * m.f + this.f
        );
    }

    inverse() {
        return new Matrix(
            this.d / this.determinant,
            -this.b / this.determinant,
            -this.c / this.determinant,
            this.a / this.determinant,
            (this.c * this.f - this.d * this.e) / this.determinant,
            (this.b * this.e - this.a * this.f) / this.determinant
        );
    }

    scale(sx, sy) {
        return Matrix.scale(sx, sy).multiply(this);
    }

    translate(e, f) {
        return Matrix.translation(e, f).multiply(this);
    }

    transformPoint(point) {
        return [
            this.a * point[0] + this.c * point[1] + this.e,
            this.b * point[0] + this.d * point[1] + this.f
        ];
    }

    scaleToPoint(point, s) {
        const normalizedPoint = this.inverse().transformPoint(point);
        return Matrix.translation(-normalizedPoint[0], -normalizedPoint[1])
            .scale(s, s)
            .translate(point[0], point[1]);
    }

    static identity() {
        return new Matrix(1, 0, 0, 1, 0, 0);
    }

    static scale(sx, sy) {
        return new Matrix(sx, 0, 0, sy, 0, 0);
    }

    static translation(tx, ty) {
        return new Matrix(1, 0, 0, 1, tx, ty);
    }


}
export default Matrix;