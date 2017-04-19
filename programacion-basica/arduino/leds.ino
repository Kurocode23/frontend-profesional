int bombillo = 13;
int espera = 500;

void setup () {
  pinMode(bombillo, OUTPUT)
}

void loop () {
  digitalWrite(bombillo, HIGH);
  delay(espera);
  digitalWrite(bombillo, LOW);
  delay(espera);
}