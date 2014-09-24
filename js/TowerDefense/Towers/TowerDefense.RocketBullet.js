TowerDefense.RocketBullet = function () {

    TowerDefense.Bullet.call( this );

    this.type = 'BULLET';
    this.meshSprite = 'bullet-02';

    this.stats = {
        damage: 3,
        speed: .008 // Movement in units.
    }

    this.path = []; // Holds information of the movement
    this.p = 0;
    this.spline = new TowerDefense.Spline();

}

TowerDefense.RocketBullet.prototype = Object.create( TowerDefense.Bullet.prototype );

TowerDefense.RocketBullet.prototype.constructor = TowerDefense.RocketBullet;

/**
 * Update the bullet a little closer towards it target, with increasing speed
 * @return void
 */
TowerDefense.RocketBullet.prototype.update = function() {

    if (this.object.position.z < -1) {
        this.remove();
        return;
    }

    // Continue moving the bullet in a straight line after the target is destroyed from another object
    if (TowerDefense.objects[this.targetIndex] == null) {
        this.deadTimer--;
        if (this.deadTimer < 100) {
            this.object.material.opacity = (this.deadTimer / 100);
        }
        if (this.deadTimer <= 0) {
            this.remove();
        }
    }
    else {

        var target = TowerDefense.objects[this.targetIndex];

        // Simple collision detection
        if (TowerDefense.inRange(target.object.position, this.object.position,1,false)) {
            TowerDefense.objects[this.targetIndex].removeHealth(this.stats.damage);
            this.remove();
            return;
        }

        if (this.path[0] == null) {
            this.path[0] = { x: this.object.position.x, y: this.object.position.y, z: this.object.position.z };
            var lastPos = {};
            for (var i = 1; i < 2; i++) {
                lastPos = {
                    x: this.object.position.x + (Math.random() * 24 - 12),
                    y: this.object.position.y + (Math.random() * 24 - 12),
                    z: this.object.position.z + (Math.random() * 24)
                };
                this.path[i] = lastPos;
            }
            this.path[2] = {
                x: lastPos.x + (Math.random() * 4 - 2),
                y: lastPos.y + (Math.random() * 4 - 2),
                z: lastPos.z + (Math.random() * 4)
            };
        }
        this.path[3] = target.object.position;

    }
    if (this.path == null || this.path[0] == null || this.path[0].x == null || this.p >= 1) {
        this.remove();
        return;
    }

    var position = this.spline.get2DPoint( this.path, this.p );

    this.object.position.x = position.x;
    this.object.position.y = position.y;
    this.object.position.z = position.z;

    this.p += this.stats.speed;

    if (1==2 && TowerDefense.counter%6 == 1) {
        var smoke = new TowerDefense.Decoration.SimpleSmoke();
        smoke.position.x = this.object.position.x - 1 + (Math.random() * 2);
        smoke.position.y = this.object.position.y - 1 + (Math.random() * 2);
        smoke.position.z = this.object.position.z - 1 + (Math.random() * 2);
        smoke.create();
        smoke.add();
        TowerDefense.scene.add(smoke.object);
    }

}